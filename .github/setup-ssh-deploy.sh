#!/usr/bin/env bash
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== GitHub Actions SSH Deployment Setup ===${NC}\n"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if we're in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Get repository information
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo -e "Repository: ${GREEN}$REPO${NC}\n"

# Prompt for server details
read -p "Enter SSH host (e.g., example.com): " SSH_HOST
read -p "Enter SSH user (e.g., deploy): " SSH_USER
read -p "Enter deploy path (e.g., /var/www/html): " DEPLOY_PATH

echo ""

# Generate SSH key if it doesn't exist
KEY_PATH="$HOME/.ssh/github_deploy_key"
if [ -f "$KEY_PATH" ]; then
    echo -e "${YELLOW}SSH key already exists at $KEY_PATH${NC}"
    read -p "Do you want to use this existing key? (y/n): " USE_EXISTING
    if [[ ! "$USE_EXISTING" =~ ^[Yy]$ ]]; then
        echo "Please specify a different key path or remove the existing key."
        exit 1
    fi
else
    echo -e "${GREEN}Generating new SSH key...${NC}"
    ssh-keygen -t ed25519 -C "github-actions-deploy" -f "$KEY_PATH" -N ""
    echo -e "${GREEN}✓ SSH key generated${NC}\n"
fi

# Display public key
echo -e "${GREEN}Public key to add to your server:${NC}"
echo "----------------------------------------"
cat "${KEY_PATH}.pub"
echo "----------------------------------------"
echo ""

# Offer to copy public key to server
read -p "Do you want to copy the public key to the server now? (y/n): " COPY_KEY
if [[ "$COPY_KEY" =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}Copying public key to server...${NC}"
    ssh-copy-id -i "${KEY_PATH}.pub" "$SSH_USER@$SSH_HOST"
    echo -e "${GREEN}✓ Public key copied to server${NC}\n"
else
    echo -e "${YELLOW}Please manually add the public key to $SSH_USER@$SSH_HOST:~/.ssh/authorized_keys${NC}\n"
fi

# Test SSH connection
echo -e "${GREEN}Testing SSH connection...${NC}"
if ssh -i "$KEY_PATH" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$SSH_USER@$SSH_HOST" "echo 'Connection test successful'" 2>/dev/null; then
    echo -e "${GREEN}✓ SSH connection test passed${NC}\n"
else
    echo -e "${RED}✗ SSH connection test failed${NC}"
    echo "Please verify:"
    echo "  1. The public key is in ~/.ssh/authorized_keys on the server"
    echo "  2. The server allows public key authentication"
    echo "  3. The ~/.ssh directory has correct permissions (700)"
    echo "  4. The authorized_keys file has correct permissions (600)"
    exit 1
fi

# Update GitHub secrets
echo -e "${GREEN}Updating GitHub secrets...${NC}"
cat "$KEY_PATH" | gh secret set SSH_PRIVATE_KEY
echo "$SSH_HOST" | gh secret set SSH_HOST
echo "$SSH_USER" | gh secret set SSH_USER
echo "$DEPLOY_PATH" | gh secret set DEPLOY_PATH
echo -e "${GREEN}✓ GitHub secrets updated${NC}\n"

# Verify secrets
echo -e "${GREEN}Verifying secrets are set:${NC}"
gh secret list | grep -E "SSH_|DEPLOY_"
echo ""

echo -e "${GREEN}=== Setup Complete ===${NC}"
echo ""
echo "Next steps:"
echo "  1. Commit and push your changes"
echo "  2. The GitHub Actions workflow will deploy automatically"
echo "  3. Check the Actions tab to monitor the deployment"
echo ""
echo "View your actions at: https://github.com/$REPO/actions"

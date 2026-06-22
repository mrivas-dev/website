# SSH Deployment Setup Guide

## Problem
The GitHub Actions workflow is failing with "Permission denied (publickey)" because the private key stored in GitHub Secrets doesn't match any authorized public key on the server.

## Solution

### Step 1: Generate a new SSH key pair (if you don't have one)

```bash
# Generate an Ed25519 key (recommended)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""

# Or generate an RSA key (if Ed25519 is not supported)
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_deploy_key -N ""
```

This creates:
- `~/.ssh/github_deploy_key` (private key - keep this secret!)
- `~/.ssh/github_deploy_key.pub` (public key - safe to share)

### Step 2: Add the public key to your server

Copy the public key to your server's authorized_keys:

```bash
# Option A: Using ssh-copy-id (easiest)
ssh-copy-id -i ~/.ssh/github_deploy_key.pub YOUR_USER@YOUR_HOST

# Option B: Manual copy
cat ~/.ssh/github_deploy_key.pub | ssh YOUR_USER@YOUR_HOST "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### Step 3: Test the key works

```bash
ssh -i ~/.ssh/github_deploy_key YOUR_USER@YOUR_HOST
```

If this works without asking for a password, the key is configured correctly!

### Step 4: Update GitHub Secret

Update the `SSH_PRIVATE_KEY` secret with your **private key**:

```bash
# Copy the private key (the one WITHOUT .pub extension)
cat ~/.ssh/github_deploy_key | gh secret set SSH_PRIVATE_KEY

# Or manually:
# 1. Copy the private key: cat ~/.ssh/github_deploy_key | pbcopy
# 2. Go to: https://github.com/YOUR_USERNAME/website/settings/secrets/actions
# 3. Edit SSH_PRIVATE_KEY and paste the key
```

**Important**: Make sure to copy the entire private key including:
- The `-----BEGIN ... PRIVATE KEY-----` header
- All the key content
- The `-----END ... PRIVATE KEY-----` footer

### Step 5: Verify other secrets

Make sure these secrets are also set correctly:

```bash
gh secret set SSH_USER --body "your_username"
gh secret set SSH_HOST --body "your.server.com"
gh secret set DEPLOY_PATH --body "/path/to/deploy/directory"
```

## Troubleshooting

### Still getting permission denied?

1. Check server logs: `sudo tail -f /var/log/auth.log` (or `/var/log/secure`)
2. Verify server SSH config allows public key auth: `grep PubkeyAuthentication /etc/ssh/sshd_config`
3. Check authorized_keys permissions:
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```
4. Ensure your user owns the files:
   ```bash
   chown -R $USER:$USER ~/.ssh
   ```

### Testing the deployment locally

You can test the rsync command locally:

```bash
rsync -avz --delete \
  -e "ssh -i ~/.ssh/github_deploy_key" \
  out/ \
  YOUR_USER@YOUR_HOST:/path/to/deploy/
```

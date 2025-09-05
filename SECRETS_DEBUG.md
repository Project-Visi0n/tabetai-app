# GitHub Secrets Diagnostic Checklist

## 1. Repository Settings
- Go to: https://github.com/theblkguy/tabetai-app/settings/secrets/actions
- Verify you see 6 secrets listed
- All secret names should be EXACTLY as shown below

## 2. Required Secrets Verification

### EC2_HOST
- **Name**: `EC2_HOST` (exact case)
- **Value**: `3.129.135.94` (your EC2 IP)
- **Length**: Should be 12-15 characters

### EC2_USER
- **Name**: `EC2_USER` (exact case)  
- **Value**: `ubuntu` (or `ec2-user`)
- **Length**: Should be 6-8 characters

### EC2_SSH_KEY
- **Name**: `EC2_SSH_KEY` (exact case)
- **Value**: Complete .pem file content including:
  ```
  -----BEGIN RSA PRIVATE KEY-----
  [multiple lines of key data]
  -----END RSA PRIVATE KEY-----
  ```
- **Length**: Should be 1600+ characters
- **Common Issues**: 
  - Missing header/footer lines
  - Extra spaces or newlines
  - Wrong key file (public vs private)

### MONGODB_URI
- **Name**: `MONGODB_URI` (exact case)
- **Value**: Format like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **Length**: Should be 100+ characters
- **Common Issues**: 
  - Missing username/password
  - Wrong database name
  - Missing connection parameters

### SPOONACULAR_API_KEY
- **Name**: `SPOONACULAR_API_KEY` (exact case)
- **Value**: 32-character alphanumeric string
- **Length**: Should be exactly 32 characters
- **Example**: `210d850a58464e618c40d192f5375938`

### GOOGLE_CLIENT_ID
- **Name**: `GOOGLE_CLIENT_ID` (exact case)
- **Value**: Should end with `.apps.googleusercontent.com`
- **Length**: Should be 70+ characters
- **Example**: `123456789-abcdefghijk.apps.googleusercontent.com`

## 3. Testing Steps

1. **Check the debug workflow**: https://github.com/theblkguy/tabetai-app/actions
2. **Look for "Test Secrets" workflow run**
3. **Check output for any "NOT SET" messages**

## 4. If Secrets Still Not Working

### Option A: Re-add secrets
1. Delete all existing secrets
2. Add them one by one with exact names
3. Test after each addition

### Option B: Manual deployment
If GitHub Actions continues to fail, you can deploy manually:

```bash
# 1. Build locally
npm run build

# 2. SCP to server
scp -r backend/ ubuntu@3.129.135.94:~/tabetai-app/

# 3. SSH and restart
ssh ubuntu@3.129.135.94
cd ~/tabetai-app/backend
pm2 restart tabetai-app
```

## 5. Debug Commands

Check if secrets are accessible in your workflow:
- Look at the "Test Secrets" Action run
- All should show "SET" not "NOT SET"
- Length values should be reasonable (not 0)

### Deploys to stik meme netlify

https://stik.netlify.app/

### env keys for Netlify testing

When deploying to Netlify, create these 2 env variables in the deployment settings.

1) NPM_TOKEN is required for netlify deployment. 
Usually all our packages are from the npm registry but this plug-wallet packages is from the Github Package Registry.
For pulling this package we need a (classic) github personal access token (can be from anyone's github account, doesn't matter) - with access to "read:packages" 

2) VITE_ENC_SECRET_KEY can be any string

## env keys for local deployment

1) VITE_ENC_SECRET_KEY can be any string


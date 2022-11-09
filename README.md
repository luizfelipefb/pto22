# Paul the Octopus 2022

GCP Function to predict winners for the World Cup 2022

## IMPORTANT !!!

Change the `src/predictor.js` file to make YOUR prediction, **surely** giving 1x0 to the better ranking team will not give have award winning results, this is just to illustrate how to create a simple GCP function to participate the competition.

## Dependencies

- nodejs 16.x
- [gcloud cli](https://cloud.google.com/sdk/docs/install)

## Develpment

First of all, run `npm install` to install all the dependencies used in the project

Now, run `gcloud init` to generate the GCP credentials needed to execute everything

We now need to create a service account to allow us to run the code, replace the <replace_with_name> with the name for yout account

```bash
export NAME=<replace_with_name>
gcloud iam service-accounts create ${NAME} --display-name ${NAME} --project phoenix-cit
```

After that we need to add some role permissions so the account can read the storage files

```bash
gcloud projects add-iam-policy-binding phoenix-cit \
  --member="serviceAccount:${NAME}@phoenix-cit.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

Now we can download our service account key to run our code, the file will be downloaded to a file named `key.json`

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=${NAME}@phoenix-cit.iam.gserviceaccount.com
```

## Testing

To test your code, simply add `predict()` at the end of the `index.js` file and run using `npm start`

Use some `console.log()` in the code to see what's happening is the easiest way to debug the code

## Deploy

To deploy the function on GCP run the following command:

```bash
export FUNCTION_NAME=<replace_with_name>
gcloud functions deploy ${FUNCTION_NAME} \
  --region us-central1 \
  --allow-unauthenticated \
  --trigger-http \
  --runtime nodejs16 \
  --entry-point predict \
  --set-env-vars PROD=true
```

Now all you need to do is access the URL with the ${FUNCTION_NAME} you previously created at:

[https://us-central1-phoenix-cit.cloudfunctions.net/FUNCTION_NAME](https://us-central1-phoenix-cit.cloudfunctions.net/FUNCTION_NAME)

to see the csv generated.

## Ending

GL HF

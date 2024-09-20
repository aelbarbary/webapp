cd /Users/abdel/Documents/nozolan/marriage/marriage-website
npm run build --mode=production
cd dist
aws s3 sync . s3://marriage-nozolan-deployment
aws cloudfront create-invalidation --distribution-id  E1PMBQMAQXCIIQ --paths "/**/*" "/*"



cd /Users/abdel/Documents/ai/webapp
npm run build --mode=production
cd dist
aws s3 sync . s3://ticketing-chatbot
aws cloudfront create-invalidation --distribution-id  E2ZZI5XTHV1X1G --paths "/**/*" "/*"


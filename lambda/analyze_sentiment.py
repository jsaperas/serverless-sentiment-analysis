import json, boto3

client = boto3.client('comprehend')

def lambda_handler(event, context):
    
    requestBody = json.loads(event['body'])
    customerReview = requestBody['customerReview']
    
    sentiment = client.detect_sentiment(Text=customerReview, LanguageCode='en')
    
    response = {
        'customerReview': customerReview,
        'sentiment': sentiment
    }
    
    return {
        "statusCode": 200,
        "body": json.dumps(response),
        "headers": {
            "Access-Control-Allow-Origin": "*"
        }
    }
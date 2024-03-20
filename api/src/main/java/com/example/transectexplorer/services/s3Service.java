package com.example.transectexplorer.services;

// import software.amazon.awssdk.core.waiters.WaiterResponse;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
// import software.amazon.awssdk.services.s3.model.CreateBucketRequest;
// import software.amazon.awssdk.services.s3.model.S3Exception;
// import software.amazon.awssdk.services.s3.model.HeadBucketRequest;
// import software.amazon.awssdk.services.s3.model.HeadBucketResponse;
// import software.amazon.awssdk.services.s3.model.ListBucketsRequest;
// import software.amazon.awssdk.services.s3.model.ListBucketsResponse;
// import software.amazon.awssdk.services.s3.model.DeleteBucketRequest;
// import software.amazon.awssdk.services.s3.waiters.S3Waiter;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
// import software.amazon.awssdk.auth.credentials.AwsCredentials;

public class s3Service {
   
    String accessKeyID = "your access key";
    String secretAccessKey = "secret";

    AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKeyID, secretAccessKey);

    S3Client s3client = S3Client.builder()
        .credentialsProvider(()-> awsCredentials)
        .region(Region.CA_CENTRAL_1)
        .build();
        
}

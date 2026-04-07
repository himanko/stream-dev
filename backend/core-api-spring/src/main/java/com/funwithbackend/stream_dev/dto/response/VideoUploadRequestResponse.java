package com.funwithbackend.stream_dev.dto.response;

import java.util.UUID;

public record VideoUploadRequestResponse(
        UUID videoFileId,
        String uploadUrl, // The temporary AWS S3 URL
        String s3ObjectKey
) {}
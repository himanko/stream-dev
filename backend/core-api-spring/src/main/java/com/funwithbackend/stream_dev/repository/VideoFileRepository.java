package com.funwithbackend.stream_dev.repository;
import com.funwithbackend.stream_dev.entity.VideoFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface VideoFileRepository extends JpaRepository<VideoFile, UUID> {}
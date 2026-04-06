package com.funwithbackend.stream_dev.repository;
import com.funwithbackend.stream_dev.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
public interface SectionRepository extends JpaRepository<Section, UUID> {}
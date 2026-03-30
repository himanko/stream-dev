# 🎥 StreamDev API - Core Video Streaming Backend

![Java](https://img.shields.io/badge/Java-26-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.0.5-brightgreen?style=for-the-badge&logo=spring-boot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Cloud-blue?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/Security-JWT_Auth-black?style=for-the-badge&logo=json-web-tokens)

**StreamDev** is a robust, secure, and highly scalable RESTful backend designed to power a modern educational video streaming platform. It features stateless architecture, role-based access control, and seamless integration with modern frontend frameworks like React.

---

## 🏗️ System Architecture

The backend is built on a standard N-Tier architecture using the Spring framework:
* **Presentation Layer:** REST Controllers handling incoming HTTP requests and global CORS configurations.
* **Security Layer:** A custom `JwtAuthFilter` intercepting all requests, verifying RSA-signed JSON Web Tokens, and managing the stateless security context.
* **Business Logic Layer:** Service classes handling core rules (e.g., verifying duplicate emails, hashing passwords via BCrypt).
* **Data Access Layer:** Spring Data JPA Repositories interfacing with a cloud-hosted PostgreSQL database.

### Core Tech Stack
* **Language:** Java 26
* **Framework:** Spring Boot 4.x
* **Security:** Spring Security 6, BCrypt, Auth0/JJWT
* **Database:** PostgreSQL (Neon.tech)
* **ORM:** Hibernate / Spring Data JPA
* **Tooling:** Maven, Lombok

---

## 📂 Project Structure

```text
src/main/java/com/funwithbackend/stream_dev/
├── config/           # Global configurations (SecurityConfig, CORS)
├── controller/       # API endpoint mappings (AuthController, VideoController)
├── dto/              # Data Transfer Objects (RegistrationRequest, AuthResponse)
├── model/            # JPA Database Entities (User, Video)
├── repository/       # Spring Data JPA interfaces
├── security/         # JWT generation, validation, and filter chains
└── service/          # Core business logic (AuthService, VideoService)
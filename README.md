# Microservices Docker Compose Setup

## Overview
This setup defines a microservices architecture using Docker Compose, including PostgreSQL, Redis, Kafka, and several backend services featuring **NestJS**.

## Services

### 1. **PostgreSQL**
- Image: `postgres:14`
- Default Credentials:
  - **User**: `postgres`
  - **Password**: `postgrespostgres`
  - **Database**: `postgres`
- Exposes port `5432`
- Persistent storage via `pgdata` volume

### 2. **pgAdmin**
- Image: `dpage/pgadmin4`
- Default Credentials:
  - **Email**: `admin@localhost.com`
  - **Password**: `123456`
- Exposes port `5050`
- Depends on PostgreSQL

### 3. **Redis**
- Image: `redis:6`
- Exposes port `6379`

### 4. **Zookeeper (Kafka Dependency)**
- Image: `bitnami/zookeeper:latest`
- Exposes port `2181`
- Allows anonymous login

### 5. **Kafka**
- Image: `bitnami/kafka:latest`
- Exposes port `9092`
- Depends on Zookeeper
- Configured with auto topic creation enabled

### 6. **Auth Service**
- Custom-built microservice
- Located in `./apps/ms-auth`
- Exposes port `3002`
- Depends on PostgreSQL and Redis
- Uses PostgreSQL as the database

### 7. **Order Service**
- Custom-built microservice
- Located in `./apps/ms-orders`
- Exposes port `3003`
- Depends on PostgreSQL and Kafka
- Communicates with `auth-service` and `inventory-service`
- Uses Kafka for messaging

### 8. **Inventory Service**
- Custom-built microservice
- Located in `./apps/ms-inventory`
- Exposes port `3004`
- Depends on PostgreSQL and Kafka
- Communicates with `auth-service`
- Uses Kafka for messaging

### 9. **Shipping Service**
- Custom-built microservice
- Located in `./apps/ms-shipping`
- Exposes port `3005`
- Depends on PostgreSQL and Kafka
- Communicates with `auth-service`
- Uses Kafka for messaging

## Running the Services
1. Ensure Docker and Docker Compose are installed.
2. Run the following command:
   ```sh
   docker-compose up -d
   ```
3. To stop services:
   ```sh
   docker-compose down
   ```

## Accessing Services
- **pgAdmin**: `http://localhost:5050`
- **Auth Service**: `http://localhost:3002`
- **Order Service**: `http://localhost:3003`
- **Inventory Service**: `http://localhost:3004`
- **Shipping Service**: `http://localhost:3005`

## Volumes
- **pgdata**: Stores PostgreSQL database files persistently.

## Notes
- Kafka health check included.
- Environment variables are configured for database connections.
- All microservices communicate internally via Docker network.

## **TODO**:
- Implement an API Gateway to handle external requests and route them to the appropriate services.
- gRPC for communication between microservices. 
- Implement Service Discovery: Use Consul or Eureka to enable dynamic service discovery.
- Set up Monitoring and Logging: Prometheus and Grafana for monitoring. Set up the ELK stack for centralized logging.
- CI/CD Integration: Automate testing and deployment using Jenkins or GitLab CI.

## **COMMANDS**:
```
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders.created --from-beginning

kafka-topics.sh --bootstrap-server 127.0.0.1:9092 --list
```

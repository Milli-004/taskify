# Use an official OpenJDK image as a base
FROM openjdk:17-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy pom.xml and download dependencies first (for caching)
COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline

# Copy project files and build the jar
COPY . .
RUN mvn clean package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/taskify-0.0.1-SNAPSHOT.jar"]

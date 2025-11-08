# Stage 1: Build with Maven and JDK
FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run with JDK runtime only
FROM openjdk:17-jdk

WORKDIR /app

COPY --from=build /app/target/taskify-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

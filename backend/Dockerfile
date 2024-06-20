#  FROM openjdk:17-jdk-slim

#  WORKDIR /app

#  ADD target/*.jar app.jar

#  EXPOSE 8080

#  ENTRYPOINT ["java", "-jar", "app.jar"]

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/learn-english-0.0.1-SNAPSHOT.jar app.jar
RUN chmod 755 app.jar
ENTRYPOINT ["java","-jar","app.jar"]
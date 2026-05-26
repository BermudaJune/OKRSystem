FROM gradle:8.8-jdk17 AS build

COPY --chown=gradle:gradle burning-okr /home/gradle/src
WORKDIR /home/gradle/src

RUN gradle :burning-okr-app:bootJar --no-daemon

FROM eclipse-temurin:17-jre

EXPOSE 8080

RUN mkdir /app

COPY --from=build /home/gradle/src/burning-okr-app/build/libs/*.jar /app/burning-okr.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/burning-okr.jar"]

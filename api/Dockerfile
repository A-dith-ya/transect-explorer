 # Use Eclipse Temurin OpenJDK to build the application
FROM eclipse-temurin:17-jdk as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn/ .mvn/

# Ensure mvnw script has LF line endings and is executable
RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix ./mvnw && \
    chmod +x ./mvnw

COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests

# Prepare the application for running
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Use Eclipse Temurin OpenJDK to run the application
FROM eclipse-temurin:17-jdk
VOLUME /tmp
ARG DEPENDENCY=/workspace/app/target/dependency

# Copy application JAR and dependencies from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","com.example.transectexplorer.TransectExplorerApplication"]
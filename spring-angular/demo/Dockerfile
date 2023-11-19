
# FROM amazoncorretto:17.0.9-alpine3.18

# WORKDIR /app

# COPY ./target/maven-wrapper-3.2.0.jar .

# EXPOSE 9080

# ENTRYPOINT [ "java", "-jar", "maven-wrapper-3.2.0.jar" ]


FROM amazoncorretto:17.0.9-alpine3.18 as builder
WORKDIR /app

COPY ./.mvn ./.mvn
COPY ./mvnw .
COPY ./pom.xml .

RUN ./mvnw dependency:go-offline 

COPY ./src ./src

RUN ./mvnw clean package -DskipTests


FROM amazoncorretto:17.0.9-alpine3.18

WORKDIR /app

COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar . 




EXPOSE 8097

ENTRYPOINT [ "java", "-jar", "demo-0.0.1-SNAPSHOT.jar" ]


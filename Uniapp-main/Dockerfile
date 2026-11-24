FROM node:22-alpine AS build
WORKDIR /app

ARG EXPO_PUBLIC_API_URL=http://localhost:8080/api
ENV EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL}

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npx expo export --platform web

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

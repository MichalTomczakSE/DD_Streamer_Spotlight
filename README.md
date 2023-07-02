# Streamer Spotlight API


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## For endpoint UI after running program visit http://localhost:3000/api 

The streamer spotlight API description

## /streamers

### POST /streamers

- **Operation ID:** StreamersController_create
- **Parameters:** None
- **Request Body:**
  - **Required:** true
  - **Content-Type:** multipart/form-data
  - **Body Schema:**
    ```yaml
    type: object
    properties:
      username:
        type: string
      platform:
        type: string
        enum:
          - YouTube
          - Twitch
          - TikTok
          - Rumble
          - Kick
      description:
        type: string
      imageFn:
        type: string
        format: binary
    ```
- **Responses:**
  - **201:**
    - **Description:**

### GET /streamers

- **Operation ID:** StreamersController_findAll
- **Parameters:** None
- **Responses:**
  - **200:**
    - **Description:**

## /streamers/{id}

### GET /streamers/{id}

- **Operation ID:** StreamersController_findOne
- **Parameters:**
  - **Name:** id
    - **Required:** true
    - **In:** path
    - **Schema:**
      ```yaml
      type: string
      ```
- **Responses:**
  - **200:**
    - **Description:**

## /streamers/{id}/vote

### PUT /streamers/{id}/vote

- **Operation ID:** StreamersController_update
- **Parameters:**
  - **Name:** id
    - **Required:** true
    - **In:** path
    - **Schema:**
      ```yaml
      type: string
      ```
- **Request Body:**
  - **Required:** true
  - **Content-Type:** application/json
  - **Body Schema:**
    ```yaml
    $ref: '#/components/schemas/UpdateStreamerDto'
    ```
- **Responses:**
  - **200:**
    - **Description:**

## /streamers/image/{id}

### GET /streamers/image/{id}

- **Operation ID:** StreamersController_getImage
- **Parameters:**
  - **Name:** id
    - **Required:** true
    - **In:** path
    - **Schema:**
      ```yaml
      type: string
      ```
- **Responses:**
  - **200:**
    - **Description:**

## Components

### Schemas

#### UpdateStreamerDto

- **Type:** object
- **Properties:**
  - **upVotes:**
    - **Type:** number
    - **Description:** Update up votes count for content creator
    - **Example:** '1'
  - **downVotes:**
    - **Type:** number
    - **Description:** Update down votes count for content creator
    - **Example:** '-1'
- **Required:**
  - upVotes
  - downVotes



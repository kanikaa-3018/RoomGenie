# Admin API Documentation

## Overview
The admin backend handles match requests from users and provides endpoints for administrators to manage match approvals, rejections, and room allocations.

## API Endpoints

### Admin Routes (Base URL: `/api/admin`)

#### 1. Get All Matches
- **GET** `/matches`
- **Description**: Retrieve all match requests for admin review
- **Response**: List of matches with users, compatibility scores, status, and room allocation

#### 2. Get Match Statistics
- **GET** `/stats`
- **Description**: Get overview statistics of all matches
- **Response**: Total, pending, approved, and rejected match counts

#### 3. Approve Match
- **PUT** `/matches/:matchId/approve`
- **Description**: Approve a pending match request
- **Body** (optional):
  ```json
  {
    "roomAllocation": "Room 101A"
  }
  ```

#### 4. Reject Match
- **PUT** `/matches/:matchId/reject`
- **Description**: Reject a pending match request

#### 5. Update Room Allocation
- **PUT** `/matches/:matchId/room-allocation`
- **Description**: Update room allocation for an approved match
- **Body**:
  ```json
  {
    "roomAllocation": "Room 205B"
  }
  ```

### User Routes for Match Submission (Base URL: `/api/users`)

#### Submit Match Request
- **POST** `/submit-match`
- **Description**: Submit a match request from user frontend to admin
- **Body**:
  ```json
  {
    "user1Id": "userId1",
    "user2Id": "userId2", 
    "compatibilityScore": 85
  }
  ```

## Data Models

### Match Schema
```javascript
{
  user1: {
    userId: ObjectId,
    name: String,
    email: String
  },
  user2: {
    userId: ObjectId,
    name: String,
    email: String
  },
  compatibilityScore: Number (0-100),
  status: String ('pending', 'approved', 'rejected'),
  roomAllocation: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Flow

1. **User Frontend**: Users select matches and submit via `/api/users/submit-match` with `user1Id`, `user2Id`, and `compatibilityScore`
2. **Admin Panel**: Administrators view all matches via `/api/admin/matches`
3. **Admin Action**: Admin approves/rejects matches and assigns rooms
4. **Status Updates**: Match status and room allocation are updated accordingly

## Example Responses

### Match List Response
```json
{
  "success": true,
  "matches": [
    {
      "_id": "matchId123",
      "user1": {
        "userId": "userId1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "user2": {
        "userId": "userId2", 
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "compatibilityScore": 87,
      "status": "pending",
      "roomAllocation": null,
      "createdAt": "2025-08-02T10:00:00Z"
    }
  ]
}
```

### Stats Response
```json
{
  "success": true,
  "stats": {
    "total": 25,
    "pending": 8,
    "approved": 15,
    "rejected": 2
  }
}
```

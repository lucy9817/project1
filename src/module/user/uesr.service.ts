import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', password: '12341234' , email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', password: '12352', email: 'jane@example.com' },
    // 기본적인 사용자 데이터를 더미데이터로 가정하고 배열에 저장합니다.
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: User): User {
    // 새로운 사용자를 생성하여 배열에 추가하고, 생성된 사용자 객체를 반환합니다.
    const newUser: User = {
        id: this.users.length + 1,
        name: user.name,
        email: user.email,
        password: ''
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUser: User): User {
    // 기존 사용자를 찾아서 정보를 업데이트하고, 업데이트된 사용자 객체를 반환합니다.
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUser };
    return this.users[userIndex];
  }

  deleteUser(id: number): User {
    // 해당 ID의 사용자를 찾아서 삭제하고, 삭제된 사용자 객체를 반환합니다.
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('해당 ID의 사용자를 찾을 수 없습니다.');
    }
    const deletedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return deletedUser;
  }
}

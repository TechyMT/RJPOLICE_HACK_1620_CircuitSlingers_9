package com.example.demo.services.impl;

import com.example.demo.dto.UserDto;
import com.example.demo.entities.UserEntity;
import com.example.demo.exceptions.AlreadyExistsException;
import com.example.demo.exceptions.NotFoundException;
import com.example.demo.mappers.impl.UserMapper;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.UserServices;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServicesImpl implements UserServices {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    @Override
    public UserDto createUser(UserDto userDto) {
        String id = userDto.getUserUID();

        if(userRepository.findByUserUID(id).isPresent()){
                throw new AlreadyExistsException("User with"+userDto.getEmail()+" already exists");
        }
        else{
            UserEntity userEntity = userMapper.mapTo(userDto);
            UserEntity savedUserEntity = userRepository.save(userEntity);
            return userMapper.mapFrom(savedUserEntity);
        }
    }
    @Override
    public UserDto updateUser(String id, UserDto userDto) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUserUID(id);
        if (userEntityOptional.isPresent()) {
            UserEntity userEntity = userEntityOptional.get();
            userEntity.setUserUID(userDto.getUserUID());
            userEntity.setCreationTime(userDto.getCreationTime());
            userEntity.setPhoneNumber(userDto.getPhoneNumber());
            userEntity.setEmailVerified(userDto.isEmailVerified());
            userEntity.setLastSignInTime(userDto.getLastSignInTime());
            UserEntity updatedEntity = userRepository.save(userEntity);

            return userMapper.mapFrom(updatedEntity);
        } else {
            throw new NotFoundException("User with " + userDto.getEmail() + " not found");
        }
    }

}

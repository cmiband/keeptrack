package com.sggw.kp_backend.task;

import com.sggw.kp_backend.auth.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskUsersDto {
    private Integer taskId;
    private List<UserDto> users;
}

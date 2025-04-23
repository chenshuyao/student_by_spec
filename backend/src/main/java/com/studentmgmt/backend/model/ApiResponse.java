package com.studentmgmt.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Generic API response class for standardized responses.
 *
 * @param <T> Type of data in the response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    /**
     * Create a success response with data.
     *
     * @param data    Response data
     * @param message Success message
     * @param <T>     Type of data
     * @return API response
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data);
    }

    /**
     * Create a success response with data and default message.
     *
     * @param data Response data
     * @param <T>  Type of data
     * @return API response
     */
    public static <T> ApiResponse<T> success(T data) {
        return success(data, "Operation successful");
    }

    /**
     * Create an error response.
     *
     * @param message Error message
     * @param <T>     Type of data
     * @return API response
     */
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }
} 
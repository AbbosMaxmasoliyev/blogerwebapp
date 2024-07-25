import { User } from "../types";
import BaseService from "./config"

interface ArgumentId {
    id?: String,
    beforeFunction?: Function,
    promotion?: string
    category?: string
}

export const apiGetUserWithUserId = async ({ id, beforeFunction }: ArgumentId): Promise<User | { success: boolean }> => {

    try {
        let responseUser = await BaseService.get(`/users/byId/${id}`)
        console.log(responseUser);
        if (beforeFunction) {
            beforeFunction(responseUser.data)
            return { success: true }
        }
        return responseUser.data
    } catch (error) {
        return { success: false }
    }


}



export const apiGetpromotionWithCategory = async ({ id, beforeFunction, promotion, category }: ArgumentId): Promise<User | { success: boolean }> => {
    if (beforeFunction) {

        try {

            let responseUser = await BaseService.get(`/promotion/${promotion}/category/${category}/${id}`)
            console.log(responseUser);
            beforeFunction(responseUser.data)
            return { success: true }


        } catch (error) {
            beforeFunction(null)
            console.log(error);
            
            return { success: false }

        }
    } else {
        return { success: false }
    }


}



export const apiGetUser = async ({ beforeFunction }: { beforeFunction: Function }): Promise<User[] | { success: boolean }> => {
    if (beforeFunction) {

        try {

            let responseUser = await BaseService.get(`/users/all`)
            beforeFunction(responseUser.data)
            return { success: true }


        } catch (error) {
            beforeFunction(null)

            return { success: false }

        }
    } else {
        return { success: false }
    }


}




export const apiGetCategories = async ({ beforeFunction }: { beforeFunction: Function }): Promise<{ success: boolean }> => {
    if (beforeFunction) {

        try {

            let responseCategories = await BaseService.get(`/categories`)
            console.log(responseCategories.data);

            beforeFunction(responseCategories.data)
            return { success: true }


        } catch (error) {
            beforeFunction(null)

            return { success: false }

        }
    } else {
        return { success: false }
    }


}




export const apiGetPublishWaiting = async ({ beforeFunction, userId }: { beforeFunction: Function, userId: string }): Promise<{ success: boolean }> => {
    if (beforeFunction) {

        try {

            let response = await BaseService.get(`/publish/${userId}`)
            console.log(response.data);

            beforeFunction(response.data)
            return { success: true }


        } catch (error) {
            beforeFunction(null)

            return { success: false }

        }
    } else {
        return { success: false }
    }


}



export const apiPostPublish = async ({ promoId, promoKey }: { promoKey: string, promoId: string }): Promise<{ success: boolean }> => {

    try {

        let response = await BaseService.post(`/publish/${promoKey}/${promoId}`)
        console.log(response.data);

        return { success: true }


    } catch (error) {

        return { success: false }

    }



} 
import { AxiosError } from "axios";
import { User } from "../types";
import BaseService from "./config"
import { UserProps } from "../pages/Profile";

interface ArgumentId {
    id?: String,
    beforeFunction?: Function,
    promotion?: string
    category?: string,
    promotionId?: string
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
        if (error instanceof AxiosError && error.response?.status === 404) {
            alert("Iltimos qayta ro'yxatdan o'ting")
            window.Telegram.WebApp.close()
        }
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
            beforeFunction(false)
            console.log(error);

            return { success: false }

        }
    } else {
        return { success: false }
    }


}

export const apiGetPromotionWithId = async ({ id, beforeFunction, promotion }: ArgumentId): Promise<User | { success: boolean }> => {
    if (beforeFunction) {

        try {

            let response = await BaseService.get(`/${promotion}/getById/${id}`)
            console.log(response);
            beforeFunction(response.data)
            return { success: true }


        } catch (error) {
            beforeFunction(false)
            console.log(error);

            return { success: false }

        }
    } else {
        return { success: false }
    }


}

export const apiGetPromtions = async ({ beforeFunction, promotion }: ArgumentId): Promise<User | { success: boolean }> => {
    if (beforeFunction) {

        try {

            let response = await BaseService.get(`/${promotion}/all`)
            console.log(response);
            beforeFunction(response.data)
            return { success: true }


        } catch (error) {
            beforeFunction(false)
            console.log(error);

            return { success: false }

        }
    } else {
        return { success: false }
    }


}


export const apiGetMyPromotions = async ({ beforeFunction, promotion, id }: ArgumentId): Promise<User | { success: boolean }> => {
    if (beforeFunction) {

        try {

            let response = await BaseService.get(`/my-promotion?promotion=${promotion}&userId=${id}`)
            console.log(response);
            beforeFunction(response.data)
            return { success: true }


        } catch (error) {
            beforeFunction(false)
            console.log(error);

            return { success: false }

        }
    } else {
        return { success: false }
    }


}


export const apiAgreePromotion = async ({ id, promotion, promotionId }: ArgumentId): Promise<{ success: boolean | string }> => {

    try {

        let response = await BaseService.get(`/agree/${id}/promotion/${promotion}/${promotionId}`)
        console.log(response);
        return { success: true }


    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError && error.response?.status == 402) {
            console.log("ERROR");

            return { success: "Вы ранее дали согласие" }
        }

        return { success: false }

    }



}



export const apiGetAgreePromotions = async ({ id, promotion, beforeFunction }: ArgumentId): Promise<{ success: boolean | string }> => {

    try {
        let response = await BaseService.get(`/${promotion}/my-collaboration/${id}/${promotion}`)

        if (beforeFunction) {
            beforeFunction(response.data)
        }
        console.log(response);

        return { success: true }


    } catch (error) {
        console.log(error);
        if (beforeFunction) {
            beforeFunction([])
        }
        if (error instanceof AxiosError && error.response?.status == 402) {
            console.log("ERROR");

            return { success: "Вы ранее дали согласие" }
        }

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


export const apiDeleteUser = async ({ beforeFunction, id }: { beforeFunction: Function | null, id: string }): Promise<{ success: boolean }> => {

    try {

        let responseUser = await BaseService.delete(`/users/${id}`)
        if (beforeFunction) {
            beforeFunction(responseUser.data)
        }

        return { success: true }
    } catch (error) {

        if (beforeFunction) {
            beforeFunction(null)
        }

        return { success: false }

    }


}


export const apiUpdateUser = async ({ id, beforeFunction, data }: { id: string, beforeFunction: Function | null, data: UserProps }): Promise<{ success: boolean }> => {

    try {

        let response = await BaseService.post(`/users/web_app/${id}`, { ...data })
        console.log(response.data);

        if (beforeFunction) {
            beforeFunction()
        }
        return { success: true }


    } catch (error) {

        if (beforeFunction) {
            beforeFunction()
        }

        return { success: false }

    }



}


export const apiUpdateLanguage = async ({ id, data }: { id: string, data: UserProps }): Promise<{ success: boolean }> => {

    try {

        let response = await BaseService.put(`/users/updateById/${id}`, { ...data })
        console.log(response.data);

        return { success: true }


    } catch (error) {



        return { success: false }

    }



}



export const apiGetCategories = async ({ beforeFunction, promotion }: { beforeFunction: Function, promotion?: string }): Promise<{ success: boolean }> => {
    if (beforeFunction) {

        try {

            let responseCategories = await BaseService.get(`/categories${promotion ? `?promotion=${promotion}` : ""}`)
            console.log(responseCategories.data);

            beforeFunction({ all: responseCategories.data.categories, length: responseCategories.data.length })
            return { success: true }


        } catch (error) {
            console.log(error);
            
            beforeFunction(null)

            return { success: false }

        }
    } else {
        return { success: false }
    }


}




export const apiGetRoles = async ({ beforeFunction }: { beforeFunction: Function }): Promise<{ success: boolean }> => {
    if (beforeFunction) {

        try {

            let responseCategories = await BaseService.get(`/roles`)
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
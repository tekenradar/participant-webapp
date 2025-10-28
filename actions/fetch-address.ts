'use server'

import logger from "@/lib/logger";

const postcodeapiURL = process.env.POSTCODE_API_URL || '';
const postcodeapiKey = process.env.POSTCODE_API_KEY || '';

export const fetchAddress = async (postalCode: string, houseNumber: string) => {
    try {
        const response = await fetch(`${postcodeapiURL}/${postalCode}/${houseNumber}`,
            {
                method: 'GET',
                headers: {
                    'x-api-key': postcodeapiKey
                }
            }
        )

        if (response.status === 404) {
            return {
                error: 'Address not found'
            }
        } else if (response.status === 400) {
            return {
                error: 'Invalid postal code or house number'
            }
        }

        const data = await response.json()
        return data
    } catch (error: unknown) {
        logger.error(`Failed to fetch address from Postcode API. Reason: ${JSON.stringify(error)}`)
        return {
            error: JSON.stringify(error)
        }
    }
}

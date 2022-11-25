import { Band, BandDTO } from "../models/Bands"
import { user } from "../models/User"

export interface BandRepository {
    registerBand(band: BandDTO):Promise<void>
    getBand(name: string):Promise<Band>
    checkDuplicateBands():Promise<any>
    checkUserRole(responsible: string):Promise<user | undefined>
}
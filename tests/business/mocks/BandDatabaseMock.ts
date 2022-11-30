import { BandRepository } from "../../../src/business/BandRepository";
import { BandDTO } from "../../../src/models/Bands";
import { user } from "../../../src/models/User";
import { bandMock } from "./BandMock";


export class BandDataBaseMock implements BandRepository {
    public async registerBand(band: BandDTO): Promise<void> {
        
    }

    public async getBand(name: string):Promise<any> {

    }
    public async checkDuplicateBands():Promise<any> {

    }
    public async checkUserRole(responsible: string):Promise<user> {
        return responsible === "doguinho" ? bandMock : undefined
    }
}
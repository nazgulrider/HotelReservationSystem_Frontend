export class Address {
    private _id:number;
    private _addressType:string;
    private _street1:string;
    private _street2: string;
    private _city: string;
    private _state: string;
    private _zip: number;


	constructor(id: number, addressType: string, street1: string, street2: string, city: string, state: string, zip: number) {
		this._id = id;
		this._addressType = addressType;
		this._street1 = street1;
		this._street2 = street2;
		this._city = city;
		this._state = state;
		this._zip = zip;
	}

    /**
     * Getter id
     * @return {number}
     */
	public get id(): number {
		return this._id;
	}

    /**
     * Getter addressType
     * @return {string}
     */
	public get addressType(): string {
		return this._addressType;
	}

    /**
     * Getter street1
     * @return {string}
     */
	public get street1(): string {
		return this._street1;
	}

    /**
     * Getter street2
     * @return {string}
     */
	public get street2(): string {
		return this._street2;
	}

    /**
     * Getter city
     * @return {string}
     */
	public get city(): string {
		return this._city;
	}

    /**
     * Getter state
     * @return {string}
     */
	public get state(): string {
		return this._state;
	}

    /**
     * Getter zip
     * @return {number}
     */
	public get zip(): number {
		return this._zip;
	}

    /**
     * Setter id
     * @param {number} value
     */
	public set id(value: number) {
		this._id = value;
	}

    /**
     * Setter addressType
     * @param {string} value
     */
	public set addressType(value: string) {
		this._addressType = value;
	}

    /**
     * Setter street1
     * @param {string} value
     */
	public set street1(value: string) {
		this._street1 = value;
	}

    /**
     * Setter street2
     * @param {string} value
     */
	public set street2(value: string) {
		this._street2 = value;
	}

    /**
     * Setter city
     * @param {string} value
     */
	public set city(value: string) {
		this._city = value;
	}

    /**
     * Setter state
     * @param {string} value
     */
	public set state(value: string) {
		this._state = value;
	}

    /**
     * Setter zip
     * @param {number} value
     */
	public set zip(value: number) {
		this._zip = value;
	}
    
}
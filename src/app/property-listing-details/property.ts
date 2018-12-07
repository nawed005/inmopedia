export class Property {

  constructor(
    public id:string,
    public meta_title: string,
    public meta_description: string,
    public prop_type: string,
    public sell_or_rent: any,
    public prop_address: string,
    public longitude: string,
    public latitude: string,
    public housing_complex: string,
    public province_id: string,
    public city_id: string,
    public zone: string,
    public prop_owner_email: string,
    public owner_mobile: string,
    public owner_phone: string,
    public owner_phone_ex: string,
    public owner_first_name: string,
    public owner_last_name: string,
    public notify_by: number,
    public prop_title: string,
    public prop_desc_en: string,
    public sq_metre_const: string,
    public sq_metre_garden: string,
    public old_of_prop: string,
    public no_of_bedroom: number,
    public no_of_bath: number,
    public no_of_half_bath: number,
    public no_of_garages: number,
    public prop_shape: string,
    public other_character: any[],
    public price_Sell: string,
    public price_rent: string,
    public condo_mnthly_expns: string,
    /* For AOT Build*/
    public user_name : string,
    public email : string,
    public name : string,
    public type : string,
    public added_by : string,
    public created_on : string
    
  ) {  }

}
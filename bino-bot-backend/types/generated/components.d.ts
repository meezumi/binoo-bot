import type { Schema, Struct } from '@strapi/strapi';

export interface CommonAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    street: Schema.Attribute.String;
  };
}

export interface CommonContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_common_contact_infos';
  info: {
    displayName: 'contactInfo';
  };
  attributes: {
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface CommonCoordinates extends Struct.ComponentSchema {
  collectionName: 'components_common_coordinates';
  info: {
    displayName: 'coordinates';
  };
  attributes: {
    latitude: Schema.Attribute.Integer;
    longitude: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.address': CommonAddress;
      'common.contact-info': CommonContactInfo;
      'common.coordinates': CommonCoordinates;
    }
  }
}

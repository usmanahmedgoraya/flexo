import { ApiProperty } from '@nestjs/swagger';

export class AccessDto {
    @ApiProperty({
        description: 'Access permission for products',
        example: false,
        default: false,
    })
    productAccess: boolean;

    @ApiProperty({
        description: 'Access permission for categories',
        example: false,
        default: false,
    })
    categoryAccess: boolean;

    @ApiProperty({
        description: 'Access permission for customers',
        example: false,
        default: false,
    })
    customerAccess: boolean;

    @ApiProperty({
        description: 'Access permission for suppliers',
        example: false,
        default: false,
    })
    supplierAccess: boolean;

    @ApiProperty({
        description: 'Access permission for sales',
        example: false,
        default: false,
    })
    salesAccess: boolean;

    @ApiProperty({
        description: 'Access permission for folders',
        example: false,
        default: false,
    })
    foldersAccess: boolean;

    @ApiProperty({
        description: 'Access permission for settings and help',
        example: false,
        default: false,
    })
    settingsHelp: boolean;

    @ApiProperty({
        description: 'Access permission for tools',
        example: false,
        default: false,
    })
    toolsAccess: boolean;

    @ApiProperty({
        description: 'Access permission for managing the stock',
        example: false,
        default: false,
    })
    manageTheStock: boolean;

    @ApiProperty({
        description: 'Access permission for accessing stores',
        example: false,
        default: false,
    })
    accessToStores: boolean;

    @ApiProperty({
        description: 'Access permission for XZ reports',
        example: false,
        default: false,
    })
    xzReport: boolean;

    @ApiProperty({
        description: 'Access permission for multi-store version',
        example: false,
        default: false,
    })
    multiStoreVersion: boolean;

    @ApiProperty({
        description: 'Access permission for repairs',
        example: false,
        default: false,
    })
    accessToRepairs: boolean;

    @ApiProperty({
        description: 'Access permission for opening the drawer without a sale',
        example: false,
        default: false,
    })
    openingDrawerWithoutSale: boolean;

    @ApiProperty({
        description: 'Access permission for ticket reminders',
        example: false,
        default: false,
    })
    ticketReminder: boolean;

    @ApiProperty({
        description: 'Access permission for changing prices and discounts',
        example: false,
        default: false,
    })
    changePricesAndDiscount: boolean;

    @ApiProperty({
        description: 'Access permission for adding products',
        example: false,
        default: false,
    })
    addProductForm: boolean;

    @ApiProperty({
        description: 'Access permission for modifying products',
        example: false,
        default: false,
    })
    modifyProductForm: boolean;
}
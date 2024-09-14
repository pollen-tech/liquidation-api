export const create_brand_req_data = {
    name: 'Loreal',
    image: 'image.jpeg',
    brand_categories: [
        {
            category_id: '2',
            category_name: 'SKIN CARE',
            sub_categories: [
                {
                    sub_category_id: '4',
                    sub_category_name: 'BODY CLEANSING',
                },
                {
                    sub_category_id: '4',
                    sub_category_name: 'BODY LOTIONS & CREAMS',
                },
            ],
        },
        {
            category_id: '5',
            category_name: 'MAKEUP',
            sub_categories: [
                {
                    sub_category_id: '26',
                    sub_category_name: 'FACE MAKEUP',
                },
                {
                    sub_category_id: '37',
                    sub_category_name: 'EYE MAKEUP',
                },
            ],
        },
    ],
};
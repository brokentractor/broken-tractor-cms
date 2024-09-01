export type TProduct = {
  id: number
  name: string
  type: string
  sku: string
  description: string
  weight: number
  width: number
  depth: number
  height: number
  price: number
  cost_price: number
  retail_price: number
  sale_price: number
  map_price: number
  tax_class_id: number
  product_tax_code: string
  calculated_price: number
  categories: number[]
  brand_id: number
  option_set_id: number | null
  option_set_display: string
  inventory_level: number
  inventory_warning_level: number
  inventory_tracking: string
  reviews_rating_sum: number
  reviews_count: number
  total_sold: number
  fixed_cost_shipping_price: number
  is_free_shipping: boolean
  is_visible: boolean
  is_featured: boolean
  related_products: number[]
  warranty: string
  bin_picking_number: string
  layout_file: string
  upc: string
  mpn: string
  gtin: string
  date_last_imported: string | null
  search_keywords: string
  availability: string
  availability_description: string
  gift_wrapping_options_type: string
  gift_wrapping_options_list: string[]
  sort_order: number
  condition: string
  is_condition_shown: boolean
  order_quantity_minimum: number
  order_quantity_maximum: number
  page_title: string
  meta_keywords: string[]
  meta_description: string
  date_created: string
  date_modified: string
  view_count: number
  preorder_release_date: string | null
  preorder_message: string
  is_preorder_only: boolean
  is_price_hidden: boolean
  price_hidden_label: string
  custom_url: {
    url: string
    is_customized: boolean
  }
  base_variant_id: number | null
  open_graph_type: string
  open_graph_title: string
  open_graph_description: string
  open_graph_use_meta_description: boolean
  open_graph_use_product_name: boolean
  open_graph_use_image: boolean
}

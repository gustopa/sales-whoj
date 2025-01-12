<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateVwRequestOrderlistView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        $secondDatabase = env('DB_DATABASE_SECOND','new-system-mahakarya');
        DB::statement("
            CREATE OR REPLACE VIEW `vw_request_orderlist` AS 
            SELECT 
                `request_order`.`row_id` AS `row_id`,
                `request_order`.`company_id` AS `company_id`,
                `request_order`.`doc_no` AS `doc_no`,
                `request_order`.`store_id` AS `store_id`,
                `store`.`name` AS `store_id_txt`,
                `request_order`.`customer_id` AS `customer_id`,
                `customer`.`name` AS `customer_id_txt`,
                `request_order`.`item_id` AS `item_id`,
                `item`.`name` AS `item_id_txt`,
                `request_order`.`sales_id` AS `sales_id`,
                `grouping_order`.`name` AS `grouping_order_id_txt`,
                `request_order`.`grouping_order_id` AS `grouping_order_id`,
                `request_order`.`identity_code` AS `identity_code`,
                `sysuser`.`name` AS `sales_id_txt`,
                `request_order`.`trans_date` AS `trans_date`,
                `request_order`.`estimated_date` AS `estimated_date`,
                `request_order`.`name` AS `name`,
                `request_order`.`type_order` AS `type_order`,
                `request_order`.`outsource_intern` AS `outsource_intern`,
                `request_order`.`qty` AS `qty`,
                `request_order`.`size` AS `size`,
                `request_order`.`warna_emas` AS `warna_emas`,
                `request_order`.`berat_emas` AS `berat_emas`,
                `request_order`.`kadar_emas` AS `kadar_emas`,
                `request_order`.`txt` AS `txt`,
                `request_order`.`notes` AS `notes`,
                `request_order`.`customer_material` AS `customer_material`,
                `request_order`.`estimated_price` AS `estimated_price`,
                `request_order`.`down_payment` AS `down_payment`,
                `request_order`.`settlement` AS `settlement`,
                `request_order`.`custom_box` AS `custom_box`,
                `request_order`.`online_offline` AS `online_offline`,
                `request_order`.`status` AS `status`,
                `request_order`.`is_sales_saved` AS `is_sales_saved`,
                `request_order`.`is_print_dp` AS `is_print_dp`,
                `request_order`.`photo_file` AS `photo_file`,
                `request_order`.`berat_jadi` AS `berat_jadi`,
                `request_order`.`work_estimated_date` AS `work_estimated_date`,
                `request_order`.`work_qty` AS `work_qty`,
                `request_order`.`work_length` AS `work_length`,
                `request_order`.`work_diameter` AS `work_diameter`,
                `request_order`.`work_ring_size` AS `work_ring_size`,
                `request_order`.`work_gold_content` AS `work_gold_content`,
                `request_order`.`work_notes` AS `work_notes`,
                `request_order`.`work_supplier` AS `work_supplier`,
                `request_order`.`work_status_order` AS `work_status_order`,
                `request_order`.`work_spk_no` AS `work_spk_no`,
                `request_order`.`work_jwcad_3d` AS `work_jwcad_3d`,
                `request_order`.`work_master` AS `work_master`,
                `request_order`.`work_pb` AS `work_pb`,
                `$secondDatabase`.`spk`.`last_process` AS `last_process`,
                `request_order`.`is_submitted` AS `is_submitted`,
                `request_order`.`is_deleted` AS `is_deleted`,
                `request_order`.`created_date` AS `created_date`,
                `request_order`.`created_by` AS `created_by`,
                `request_order`.`modified_date` AS `modified_date`,
                `request_order`.`modified_by` AS `modified_by`
            FROM 
                `request_order`
                LEFT JOIN `store` ON `request_order`.`store_id` = `store`.`row_id`
                LEFT JOIN `customer` ON `request_order`.`customer_id` = `customer`.`row_id`
                LEFT JOIN `sysuser` ON `request_order`.`sales_id` = `sysuser`.`row_id`
                LEFT JOIN `item` ON `request_order`.`item_id` = `item`.`row_id`
                LEFT JOIN `grouping_order` ON `request_order`.`grouping_order_id` = `grouping_order`.`row_id`
                LEFT JOIN `$secondDatabase`.`spk` ON `$secondDatabase`.`spk`.`request_order_no` = `request_order`.`doc_no` 
                AND `$secondDatabase`.`spk`.`is_deleted` = 0
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `vw_request_orderlist`");
    }
}

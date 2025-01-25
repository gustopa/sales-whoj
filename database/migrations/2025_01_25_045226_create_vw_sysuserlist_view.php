<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("CREATE VIEW `vw_sysuserlist` AS select `" . env('DB_DATABASE') . "`.`sysuser`.`row_id` AS `row_id`,`" . env('DB_DATABASE') . "`.`sysuser`.`company_id` AS `company_id`,`" . env('DB_DATABASE') . "`.`syscompany`.`name` AS `company_id_txt`,`" . env('DB_DATABASE') . "`.`syscompany`.`is_active` AS `is_active_company`,`" . env('DB_DATABASE') . "`.`syscompany`.`file_logo` AS `company_id_logo`,`" . env('DB_DATABASE') . "`.`sysuser`.`role_id` AS `role_id`,`" . env('DB_DATABASE') . "`.`sysrole`.`name` AS `role_id_txt`,`" . env('DB_DATABASE') . "`.`sysuser`.`store_id` AS `store_id`,`" . env('DB_DATABASE') . "`.`store`.`name` AS `store_id_txt`,`" . env('DB_DATABASE') . "`.`sysuser`.`employee_id` AS `employee_id`,`" . env('DB_DATABASE') . "`.`sysemployee`.`employee_no` AS `employee_id_txt`,`" . env('DB_DATABASE') . "`.`sysuser`.`name` AS `name`,`" . env('DB_DATABASE') . "`.`sysuser`.`email` AS `email`,`" . env('DB_DATABASE') . "`.`sysuser`.`user_id` AS `user_id`,`" . env('DB_DATABASE') . "`.`sysuser`.`pswrd` AS `pswrd`,`" . env('DB_DATABASE') . "`.`sysuser`.`encrypt_user_id` AS `encrypt_user_id`,`" . env('DB_DATABASE') . "`.`sysuser`.`need_reset_password` AS `need_reset_password`,`" . env('DB_DATABASE') . "`.`sysuser`.`google_token` AS `google_token`,`" . env('DB_DATABASE') . "`.`sysuser`.`is_login` AS `is_login`,`" . env('DB_DATABASE') . "`.`sysuser`.`is_active` AS `is_active`,`" . env('DB_DATABASE') . "`.`sysuser`.`is_submitted` AS `is_submitted`,`" . env('DB_DATABASE') . "`.`sysuser`.`is_deleted` AS `is_deleted`,`" . env('DB_DATABASE') . "`.`sysuser`.`created_date` AS `created_date`,`" . env('DB_DATABASE') . "`.`sysuser`.`created_by` AS `created_by`,`" . env('DB_DATABASE') . "`.`sysuser`.`modified_date` AS `modified_date`,`" . env('DB_DATABASE') . "`.`sysuser`.`modified_by` AS `modified_by` from ((((`" . env('DB_DATABASE') . "`.`sysuser` left join `" . env('DB_DATABASE') . "`.`sysrole` on(`" . env('DB_DATABASE') . "`.`sysuser`.`role_id` = `" . env('DB_DATABASE') . "`.`sysrole`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`sysemployee` on(`" . env('DB_DATABASE') . "`.`sysuser`.`employee_id` = `" . env('DB_DATABASE') . "`.`sysemployee`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`syscompany` on(`" . env('DB_DATABASE') . "`.`sysuser`.`company_id` = `" . env('DB_DATABASE') . "`.`syscompany`.`row_id`)) left join `" . env('DB_DATABASE') . "`.`store` on(`" . env('DB_DATABASE') . "`.`store`.`row_id` = `" . env('DB_DATABASE') . "`.`sysuser`.`store_id`))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_sysuserlist`");
    }
};

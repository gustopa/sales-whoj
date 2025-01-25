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
        DB::statement("
            CREATE VIEW `vw_customertotalpurchaselist` AS 
            SELECT 
                COUNT(1) AS `total`,
                MAX(`b`.`name`) AS `customer_name`,
                `a`.`customer_id` AS `customer_id`,
                MAX(`c`.`city_name`) AS `city_name`,
                CASE 
                    WHEN IFNULL(`b`.`city_id`, 0) IN (155, 156, 157, 158, 159, 160, 176, 183, 161, 179, 184, 268, 270, 273) 
                    THEN 1 
                    ELSE 0 
                END AS `jabodetabek`
            FROM 
                (`" . env('DB_DATABASE') . "`.`payment` `a`
                JOIN `" . env('DB_DATABASE') . "`.`customer` `b` ON `a`.`customer_id` = `b`.`row_id`)
                LEFT JOIN `" . env('DB_DATABASE') . "`.`city` `c` ON `c`.`row_id` = `b`.`city_id`
            WHERE 
                `a`.`status` = 'PAID' AND `a`.`is_deleted` = 0
            GROUP BY 
                `a`.`customer_id`,
                CASE 
                    WHEN IFNULL(`b`.`city_id`, 0) IN (155, 156, 157, 158, 159, 160, 176, 183, 161, 179, 184, 268, 270, 273) 
                    THEN 1 
                    ELSE 0 
                END
        ");
    }
    


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `vw_customertotalpurchaselist`");
    }
};

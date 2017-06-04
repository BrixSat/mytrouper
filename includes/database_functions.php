<?php


class DatabaseFunctions {

    public $DB_SERVER;
    public $DB_USER;
    public $DB_PASS;
    public $DB_NAME;
    public $obj_identifier;

   

    function __construct($DB_SERVER = "", $DB_USER = "", $DB_PASS = "", $DB_NAME = "", $database_hostname = "") {
        if ($database_hostname != "") {
            $this->str_host_name = trim($DB_SERVER); // host name
            $this->str_user_name = trim($DB_USER); // user name
            $this->str_password = trim($DB_PASS); // password
            $this->str_database_name = trim($DB_NAME); // database name
        } else {
            $this->str_host_name = trim(DB_SERVER); // host name
            $this->str_user_name = trim(DB_USER); // user name
            $this->str_password = trim(DB_PASS); // password
            $this->str_database_name = trim(DB_NAME); // database name
        }

        $this->obj_identifier = mysqli_connect($this->str_host_name, $this->str_user_name, $this->str_password, $this->str_database_name); // establishing connection  link identifier
        if (mysqli_connect_errno($this->obj_identifier)) {
            die("Unexpected Error");
        }
    }

    /*
     * function for escape string
     * @return escaped string.
     * @param string str
     */

    function EscapeString($str) {
        return mysqli_real_escape_string($this->obj_identifier, $str);
    }

    /*
     * function for insert into table
     * @return number of rows inserted.
     * @param string tablename, array details(pass associative array with fieildname as key ), link identifier
     */

    function InsertToTable($str_table_name, $arr_details) {
        $str_Query = 'INSERT INTO ' . $str_table_name . ' ';
        $int_iteration = 0;
        $var = '';
        $field = '';
        $types = '';
        if (is_array($arr_details)) {
            foreach ($arr_details as $key => $value) {
                $types.= substr(strtolower(gettype(trim($value))), 0, 1);
            }
            $bind_names[] = $types;
            foreach ($arr_details as $key => $value) {

                $var.='?,';
                $field.='`' . $key . '`,';

                $bind_name = 'bind' . $int_iteration;
                $$bind_name = trim($value);
                $bind_names[] = &$$bind_name;
                $int_iteration ++;
            }

            $field = trim($field, ',');
            $var = trim($var, ',');
        }
        //echo $str_Query.'('.$field.') VALUES ('.$var.')';
        $stmt = $this->obj_identifier->prepare($str_Query . '(' . $field . ') VALUES (' . $var . ')');
	
        if ($stmt) {
            call_user_func_array(array($stmt, 'bind_param'), $bind_names);

            $int_result = $stmt->execute();


            if (!$int_result) {
                die("Unexpected Error");
            }
            $stmt->close();


            return mysqli_insert_id($this->obj_identifier);
        } else {
            echo 'Error';
            //die;
        }
    }

    /*
     * function for update table details
     * @return number of rows updated.
     * @param string tablename, array detasil(pass associative array with fieildname as key ), link identifier
     */

    function UpdateTable($str_table_name, $arr_details, $str_primary_key) {
        $str_Query = 'UPDATE  ' . $str_table_name . ' SET ';

        $int_iteration = 0;
        $var = '';
        $field = '';
        $types = '';

        if (is_array($arr_details)) {
            foreach ($arr_details as $key => $value) {
                $types.= substr(strtolower(gettype(trim($value))), 0, 1);
            }
            $bind_names[] = $types;
            foreach ($arr_details as $key => $value) {
                if ($int_iteration != 0 && $key != $str_primary_key) {
                    $str_Query .= ',';
                }
                if ($key != $str_primary_key) {
                    $str_Query .= mysqli_real_escape_string($this->obj_identifier, $key) . '= ?';
                }
                if ($key == $str_primary_key) {
                    $str_Query .= " WHERE " . mysqli_real_escape_string($this->obj_identifier, $key) . '= ?';
                }
                $bind_name = 'bind' . $int_iteration;
                $$bind_name = trim($value);
                $bind_names[] = &$$bind_name;
                $int_iteration ++;
            }
        }


        $stmt = $this->obj_identifier->prepare($str_Query);

        if ($stmt) {
            call_user_func_array(array($stmt, 'bind_param'), $bind_names);

            $int_result = $stmt->execute();


            if (!$int_result) {
                die("Unexpected Error");
            }
            $stmt->close();


            return ( $int_result );
        } else {
            return false;
        }
    }

//Update table close.

    /*
     * function for delete details from table
     * @return number of rows delected.
     * @param string table name, string condition( eg: name = 'AA'), link identifier
     */

    function DeleteFromTable($str_table_name, $condition) {
        $str_Query = 'DELETE FROM ' . $str_table_name . ' WHERE ' . $condition;
        $int_result = mysqli_query($this->obj_identifier, $str_Query);
        if (!$int_result) {
            die("Unexpected Error");
        }

        return $int_result;
    }

    /*
     * function for select details from table
     * @return array with selected details.
     * @param string select query, link identifier
     */

    function SelectFromTable($str_Query, $val = null) {

        try {

            $dsn = "mysql:host=" . $this->str_host_name . ";dbname=" . $this->str_database_name;
            $conn = new PDO($dsn, $this->str_user_name, $this->str_password);
            // set the PDO error mode to exception

            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);

            $stmt = $conn->prepare($str_Query);

            $stmt->execute($val);

            $int_count = 0;
            $arr_Result = array();
            foreach ($stmt->fetchAll() as $arr_values) {

                foreach ($arr_values as $str_field_name => $str_value) {
                    $arr_Result[$int_count][$str_field_name] = $str_value;
                }
                $int_count++;
            }
            return $arr_Result;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    function DatabaseQuery($str_Query, $val) {
        $str_Query = $str_Query;

        $int_iteration = 0;
        $var = '';
        $field = '';
        $types = '';

        if (is_array($val)) {
            foreach ($val as $key => $value) {
                $types.= substr(strtolower(gettype($value)), 0, 1);
            }
            $bind_names[] = $types;
            foreach ($val as $key => $value) {
                $bind_name = 'bind' . $int_iteration;
                $$bind_name = $value;
                $bind_names[] = &$$bind_name;
                $int_iteration ++;
            }
        }


        $stmt = $this->obj_identifier->prepare($str_Query);

        if ($stmt) {
            call_user_func_array(array($stmt, 'bind_param'), $bind_names);

            $int_result = $stmt->execute();


            if (!$int_result) {
                die("Unexpected Error");
            }
            $stmt->close();


            return ( $int_result );
        } else {
            return false;
        }
        $int_result = mysqli_query($this->obj_identifier, $str_Query);
        if (!$int_result) {
            die("Unexpected Error");
        }
        return ( $int_result );
    }

    function Database_num_rows($str_Query) {

        $int_result = mysqli_query($this->obj_identifier, $str_Query);
        if (!$int_result) {
            die("Unexpected Error");
        }

        return (mysqli_num_rows($int_result));
    }

    function Database_connection_close() {
        mysqli_close($this->obj_identifier);
    }

    function xss_clean($str) {

        if (is_array($str) OR is_object($str)) {
            foreach ($str as $k => $s) {
                $str[$k] = $this->xss_clean($s);
            }

            return $str;
        }

        // Remove all NULL bytes
        $str = str_replace("\0", '', $str);

        // Fix &entity\n;
        $str = str_replace(array('&amp;', '&lt;', '&gt;'), array('&amp;amp;', '&amp;lt;', '&amp;gt;'), $str);
        $str = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $str);
        $str = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $str);
        //$str = html_entity_decode($str, ENT_COMPAT, Kohana::$charset);
        // Remove any attribute starting with "on" or xmlns
        $str = preg_replace('#(?:on[a-z]+|xmlns)\s*=\s*[\'"\x00-\x20]?[^\'>"]*[\'"\x00-\x20]?\s?#iu', '', $str);

        // Remove javascript: and vbscript: protocols
        $str = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $str);
        $str = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $str);
        $str = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $str);

        // Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
        $str = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#is', '$1>', $str);
        $str = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#is', '$1>', $str);
        $str = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#ius', '$1>', $str);

        // Remove namespaced elements (we do not need them)
        $str = preg_replace('#</*\w+:\w[^>]*+>#i', '', $str);

        do {
            // Remove really unwanted tags
            $old = $str;
            $str = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $str);
        } while ($old !== $str);

        return $str;
    }
	function xss_clean_get($str) {
		$str = preg_replace('/[^A-Za-z0-9-.@_]/', '', $str);
		return $str;
    }

}

?>
<?php

/**
 * Functions class is used to contain global functions for front end site. 
 * 
 */


class functions {

    /**
     * Holds database functions and has access to insert, update delete functions. 
     * @var Object
     */
    var $db;

    /**
     * Global Instance variable holds  the product id.
     * @var Integer
     */
    var $pid;

    public function __construct($pro = "") {
        $this->db = new DatabaseFunctions();
    }

    
    /**
     * TO FIND FILE EXTENSION
     * @param  [String] $filename 
     * @return [Object]         
     */
    public function findexts($filename) {
        $filename = strtolower($filename);
        $exts = strtolower(end(explode('.', $filename)));
        return $exts;
    }
	
	public function upload_simple_files($filename, $uploaddir, $filter, $prefix = '') {
        $ftype_image = array("png", "jpg", "jpeg", "gif");
        $ftype_audio = array("mp3", "wav", "aif", "mid");
        $filelocation = $uploaddir;
        $extension = $this->findexts($filename[0]['name']);
        $randomname = rand(0, 99999999999999);
        $newfilename = $randomname . "." . $extension;
        if ($filter == "images") {
			
            if (in_array($extension, $ftype_image)) {
                $flag = 1;
            } else {
                $flag = 0;
            }
			if($prefix != ""){
				$prefix = $prefix."_";
			}
			 $newfilename =  $prefix."".$newfilename;
			 
        } 
		elseif ($filter == "audio") {
            if (in_array($extension, $ftype_audio)) {
                $flag = 1;
            } else {
                $flag = 0;
            }
			if($prefix != ""){
				$prefix = $prefix."_";
			}
			 $newfilename =  $prefix."".$newfilename;
        } 
		else {
            $message = "File not selected";
            return $message;
        }
        $target_path = $filelocation . $newfilename;
		
        if ($flag == 1) {
            if (!empty($target_path) && !empty($filename[0]['tmp_name'])) {
                @move_uploaded_file($filename[0]['tmp_name'], $target_path);
                $message = $newfilename;
                return $message;
            } else {
                $error = "No File Selected";
                return $error;
            }
        } else {
            $message = "Invalid File type. Please upload supported file types";
            return $message;
        }
    }

    /**
     * Common function to do a clean url .
     * Function is used in cleaning various product and metadata title values.
     * @param  $str - String 
     * @return $res  | row
     */
    public function url_slug($str, $options = array()) {
        // Make sure string is in UTF-8 and strip invalid UTF-8 characters
        $str = mb_convert_encoding((string) $str, 'UTF-8', mb_list_encodings());

        $defaults = array(
            'delimiter' => '-',
            'limit' => null,
            'lowercase' => true,
            'replacements' => array(),
            'transliterate' => false,
        );

        // Merge options
        $options = array_merge($defaults, $options);

        $char_map = array(
            // Latin
            '�' => 'A', '�' => 'A', '�' => 'A', '�' => 'A', '�' => 'A', '�' => 'A', '�' => 'AE', '�' => 'C',
            '�' => 'E', '�' => 'E', '�' => 'E', '�' => 'E', '�' => 'I', '�' => 'I', '�' => 'I', '�' => 'I',
            '�' => 'D', '�' => 'N', '�' => 'O', '�' => 'O', '�' => 'O', '�' => 'O', '�' => 'O', 'O' => 'O',
            '�' => 'O', '�' => 'U', '�' => 'U', '�' => 'U', '�' => 'U', 'U' => 'U', '�' => 'Y', '�' => 'TH',
            '�' => 'ss',
            '�' => 'a', '�' => 'a', '�' => 'a', '�' => 'a', '�' => 'a', '�' => 'a', '�' => 'ae', '�' => 'c',
            '�' => 'e', '�' => 'e', '�' => 'e', '�' => 'e', '�' => 'i', '�' => 'i', '�' => 'i', '�' => 'i',
            '�' => 'd', '�' => 'n', '�' => 'o', '�' => 'o', '�' => 'o', '�' => 'o', '�' => 'o', 'o' => 'o',
            '�' => 'o', '�' => 'u', '�' => 'u', '�' => 'u', '�' => 'u', 'u' => 'u', '�' => 'y', '�' => 'th',
            '�' => 'y',
            // Latin symbols
            '�' => '(c)',
            // Greek
            '?' => 'A', '?' => 'B', 'G' => 'G', '?' => 'D', '?' => 'E', '?' => 'Z', '?' => 'H', 'T' => '8',
            '?' => 'I', '?' => 'K', '?' => 'L', '?' => 'M', '?' => 'N', '?' => '3', '?' => 'O', '?' => 'P',
            '?' => 'R', 'S' => 'S', '?' => 'T', '?' => 'Y', 'F' => 'F', '?' => 'X', '?' => 'PS', 'O' => 'W',
            '?' => 'A', '?' => 'E', '?' => 'I', '?' => 'O', '?' => 'Y', '?' => 'H', '?' => 'W', '?' => 'I',
            '?' => 'Y',
            'a' => 'a', '�' => 'b', '?' => 'g', 'd' => 'd', 'e' => 'e', '?' => 'z', '?' => 'h', '?' => '8',
            '?' => 'i', '?' => 'k', '?' => 'l', '�' => 'm', '?' => 'n', '?' => '3', '?' => 'o', 'p' => 'p',
            '?' => 'r', 's' => 's', 't' => 't', '?' => 'y', 'f' => 'f', '?' => 'x', '?' => 'ps', '?' => 'w',
            '?' => 'a', '?' => 'e', '?' => 'i', '?' => 'o', '?' => 'y', '?' => 'h', '?' => 'w', '?' => 's',
            '?' => 'i', '?' => 'y', '?' => 'y', '?' => 'i',
            // Turkish
            'S' => 'S', 'I' => 'I', '�' => 'C', '�' => 'U', '�' => 'O', 'G' => 'G',
            's' => 's', 'i' => 'i', '�' => 'c', '�' => 'u', '�' => 'o', 'g' => 'g',
            // Russian
            '?' => 'A', '?' => 'B', '?' => 'V', '?' => 'G', '?' => 'D', '?' => 'E', '?' => 'Yo', '?' => 'Zh',
            '?' => 'Z', '?' => 'I', '?' => 'J', '?' => 'K', '?' => 'L', '?' => 'M', '?' => 'N', '?' => 'O',
            '?' => 'P', '?' => 'R', '?' => 'S', '?' => 'T', '?' => 'U', '?' => 'F', '?' => 'H', '?' => 'C',
            '?' => 'Ch', '?' => 'Sh', '?' => 'Sh', '?' => '', '?' => 'Y', '?' => '', '?' => 'E', '?' => 'Yu',
            '?' => 'Ya',
            '?' => 'a', '?' => 'b', '?' => 'v', '?' => 'g', '?' => 'd', '?' => 'e', '?' => 'yo', '?' => 'zh',
            '?' => 'z', '?' => 'i', '?' => 'j', '?' => 'k', '?' => 'l', '?' => 'm', '?' => 'n', '?' => 'o',
            '?' => 'p', '?' => 'r', '?' => 's', '?' => 't', '?' => 'u', '?' => 'f', '?' => 'h', '?' => 'c',
            '?' => 'ch', '?' => 'sh', '?' => 'sh', '?' => '', '?' => 'y', '?' => '', '?' => 'e', '?' => 'yu',
            '?' => 'ya',
            // Ukrainian
            '?' => 'Ye', '?' => 'I', '?' => 'Yi', '?' => 'G',
            '?' => 'ye', '?' => 'i', '?' => 'yi', '?' => 'g',
            // Czech
            'C' => 'C', 'D' => 'D', 'E' => 'E', 'N' => 'N', 'R' => 'R', '�' => 'S', 'T' => 'T', 'U' => 'U',
            '�' => 'Z',
            'c' => 'c', 'd' => 'd', 'e' => 'e', 'n' => 'n', 'r' => 'r', '�' => 's', 't' => 't', 'u' => 'u',
            '�' => 'z',
            // Polish
            'A' => 'A', 'C' => 'C', 'E' => 'e', 'L' => 'L', 'N' => 'N', '�' => 'o', 'S' => 'S', 'Z' => 'Z',
            'Z' => 'Z',
            'a' => 'a', 'c' => 'c', 'e' => 'e', 'l' => 'l', 'n' => 'n', '�' => 'o', 's' => 's', 'z' => 'z',
            'z' => 'z',
            // Latvian
            'A' => 'A', 'C' => 'C', 'E' => 'E', 'G' => 'G', 'I' => 'i', 'K' => 'k', 'L' => 'L', 'N' => 'N',
            '�' => 'S', 'U' => 'u', '�' => 'Z',
            'a' => 'a', 'c' => 'c', 'e' => 'e', 'g' => 'g', 'i' => 'i', 'k' => 'k', 'l' => 'l', 'n' => 'n',
            '�' => 's', 'u' => 'u', '�' => 'z'
        );

        // Make custom replacements
        $str = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);

        // Transliterate characters to ASCII
        if ($options['transliterate']) {
            $str = str_replace(array_keys($char_map), $char_map, $str);
        }

        // Replace non-alphanumeric characters with our delimiter
        $str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);

        // Remove duplicate delimiters
        $str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);

        // Truncate slug to max. characters
        $str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');

        // Remove delimiter from ends
        $str = trim($str, $options['delimiter']);

        return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
    }

    public function cryptoJsAesDecrypt($passphrase, $jsonString) {
        $jsondata = json_decode($jsonString, true);
        $salt = hex2bin($jsondata["s"]);
        $ct = base64_decode($jsondata["ct"]);
        $iv = hex2bin($jsondata["iv"]);
        $concatedPassphrase = $passphrase . $salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];
        for ($i = 1; $i < 3; $i++) {
            $md5[$i] = md5($md5[$i - 1] . $concatedPassphrase, true);
            $result .= $md5[$i];
        }
        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        return json_decode($data, true);
    }

    public function cryptoJsAesEncrypt($passphrase, $value) {
        $salt = openssl_random_pseudo_bytes(8);
        $salted = '';
        $dx = '';
        while (strlen($salted) < 48) {
            $dx = md5($dx . $passphrase . $salt, true);
            $salted .= $dx;
        }
        $key = substr($salted, 0, 32);
        $iv = substr($salted, 32, 16);
        $encrypted_data = openssl_encrypt(json_encode($value), 'aes-256-cbc', $key, true, $iv);
        $data = array("ct" => base64_encode($encrypted_data), "iv" => bin2hex($iv), "s" => bin2hex($salt));
        return json_encode($data);
    }

    
    public function dateTimeDiff($past_date) {
        $today = date('Y-m-d H:i:s');
        $fetch_dt = date_create($past_date);
        $current = date_create($today);
        $interval = date_diff($fetch_dt, $current);
        //print_r($interval);
        $ago_time = "";
        if (($interval->format('%y') == 0) and ( $interval->format('%m') == 0) and ( $interval->format('%d') == 0) and ( $interval->format('%h') == 0) and ( $interval->format('%i') == 0)) {
            $ago_time = '0 MIN AGO';
        } else if (($interval->format('%y') == 0) and ( $interval->format('%m') == 0) and ( $interval->format('%d') == 0) and ( $interval->format('%h') == 0)) {
            if ($interval->format('%i') > 1) {
                $ago_time = $interval->format('%i') . '  MINS AGO.';
            } else {
                $ago_time = $interval->format('%i') . '  MIN AGO.';
            }
        } else if (($interval->format('%y') == 0) and ( $interval->format('%m') == 0) and ( $interval->format('%d') == 0)) {
            if ($interval->format('%h') > 1) {
                $ago_time = $interval->format('%h') . ' HOURS AGO';
            } else {
                $ago_time = $interval->format('%h') . ' HOUR AGO';
            }
        } else if (($interval->format('%y') == 0) and ( $interval->format('%m') == 0)) {
            if ($interval->format('%d') > 1) {
                $ago_time = $interval->format('%d') . ' DAYS AGO';
            } else {
                $ago_time = $interval->format('%d') . ' DAY AGO';
            }
        } else if (($interval->format('%y') == 0)) {
            if ($interval->format('%m') > 1) {
                $ago_time = $interval->format('%m') . ' MONTHS AGO';
            } else {
                $ago_time = $interval->format('%m') . ' MONTH AGO';
            }
        } else if (($interval->format('%y') != 0)) {
            if ($interval->format('%y') > 1) {
                $ago_time = $interval->format('%y') . ' YEARS AGO';
            } else {
                $ago_time = $interval->format('%y') . ' YEAR AGO';
            }
        } else {
            $ago_time = 'UNKNOWN';
        }
        return $ago_time;
        //return $past_date;
    }

    public function request_url_xss_clean_get() {
        $link_array = explode('/', $_SERVER['REQUEST_URI']);
        foreach ($link_array as $value) {
            $link_array_new[] = preg_replace('/[^A-Za-z0-9-.@_\/]/', '', (strip_tags($value)));
        }
        return $link_array_new;
    }
	
	public function xss_clean($str) {

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
        /*$str = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $str);
        $str = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $str);
        $str = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $str);*/

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
        //$str = $this->sanitiseURL($str);

        return $str;
    }

    public function xss_clean_get($str) {
        $str = preg_replace('/[^A-Za-z0-9-.@_\/ ]/', '', $str);
        return $str;
    }

    public function sanitiseURL($url, $encode = false) {
        $url = filter_var(urldecode($url), FILTER_SANITIZE_SPECIAL_CHARS);
        if (!filter_var($url, FILTER_VALIDATE_URL))
            return false;
        return $encode ? urlencode($url) : $url;
    }
	
	public function sanitise_server_uri($uri = null) {
		$uri = preg_replace('/[^A-Za-z0-9-.@_\/]/', '', $uri);
		return $uri;
	}
	
	public function audio_player(){
		?>
		<div class="ap" id="ap">
		  <div class="ap__inner">
		      <div class="ap__item ap__item--playback">
		        <button class="ap__controls ap__controls--prev">
		          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		            <path d="M9.516 12l8.484-6v12zM6 6h2.016v12h-2.016v-12z"></path>
		          </svg>
		        </button>
		        <button class="ap__controls ap__controls--toggle">
		          <svg class="icon-play" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="36" height="36" viewBox="0 0 36 36" data-play="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" data-pause="M 12,26 16.33,26 16.33,10 12,10 z M 20.66,26 25,26 25,10 20.66,10 z">
		            <path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z"></path>
		          </svg>
		        </button>
		        <button class="ap__controls ap__controls--next">
		          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		            <path d="M15.984 6h2.016v12h-2.016v-12zM6 18v-12l8.484 6z"></path>
		          </svg>
		        </button>
		      </div>
		      <div class="ap__item ap__item--track">
		        <div class="track">
		          <div class="track__title">Queue is empty</div>
		          <div class="track__time">
		            <span class="track__time--current">--</span>
		            <span> / </span>
		            <span class="track__time--duration">--</span>
		          </div>

		          <div class="progress-container">
		            <div class="progress">
		              <div class="progress__bar"></div>
		              <div class="progress__preload"></div>
		            </div>
		          </div>

		        </div>
		      </div>
		      <div class="ap__item ap__item--settings">
		        <div class="ap__controls volume-container">
		          <button class="volume-btn">
		            <svg class="icon-volume-on" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		              <path d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q2.484 1.219 2.484 4.031zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"></path>
		            </svg>
		            <svg class="icon-volume-off" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		              <path d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.734 1.359-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.25-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q2.484 1.219 2.484 4.031z"></path>
		            </svg>
		          </button>
		          <div class="volume">
		            <div class="volume__track">
		              <div class="volume__bar"></div>
		            </div>
		          </div>
		        </div>
		        <button class="ap__controls ap__controls--repeat">
		          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		            <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031h-1.969v-6h12v-3l3.984 3.984-3.984 3.984v-3h-10.031z"></path>
		          </svg>
		        </button>
		        <button class="ap__controls ap__controls--playlist">
		          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#333" width="24" height="24" viewBox="0 0 24 24">
		            <path d="M17.016 12.984l4.969 3-4.969 3v-6zM2.016 15v-2.016h12.984v2.016h-12.984zM18.984 5.016v1.969h-16.969v-1.969h16.969zM18.984 9v2.016h-16.969v-2.016h16.969z"></path>
		          </svg>
		        </button>
		      </div>
		  </div>
		</div>
		<?php
	}
	
	public function artist_categoris(){
		$sql = "SELECT `artist_category_id`, `artist_category_name` FROM `master_artist_category` WHERE `status` = ?";
		$sql_val = array(1);
		return $this->db->SelectFromTable($sql, $sql_val);
	}
}

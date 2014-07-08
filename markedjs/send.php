<?php

/*1efef65980be4b5655d978f28047be2bc4ee6058
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$writeFile = function($filename, $data, $format) {
    $isJSON = function($json, $returnOnlyStatus = false) {
        $response = new stdClass();
        $object = json_decode($json, false);

        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                $response->status = true;
                $response->data = $object;
                $response->error = '';
                break;
            case JSON_ERROR_DEPTH:
                $response->status = false;
                $response->data = '';
                $response->error = 'Maximum stack depth exceeded.';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $response->status = false;
                $response->data = '';
                $response->error = 'Underflow or the modes mismatch.';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $response->status = false;
                $response->data = '';
                $response->error = 'Unexpected control character found.';
                break;
            case JSON_ERROR_SYNTAX:
                $response->status = false;
                $response->data = '';
                $response->error = 'Syntax error, malformed JSON.';
                break;
            case JSON_ERROR_UTF8:
                $response->status = false;
                $response->data = '';
                $response->error = 'Malformed UTF-8 characters, possibly incorrectly encoded.';
                break;
            default:
                $response->status = false;
                $response->data = '';
                $response->error = 'Unknown JSON error occured.';
                break;
        }

        if ($returnOnlyStatus === false) {
            if (is_object($response->data)) {
                return $response->status;
            }
            return false;
        }

        if (is_object($response->data)) {
            return $response;
        }
        return '';
    };
    $result = false;
    $validJSON = $isJSON($data, true);
    if ($validJSON->status === true) {
        if (file_put_contents($filename, $validJSON->data) == true) {
            $result = $validJSON;
        } else {
            $fail = new stdClass();
            $fail->status = false;
            $fail->data = '';
            $fail->error = 'Failed to write data file.';
            $result = $fail;
        }
    }

    if (is_object($result)) {
        $arrayResult = (array) $result;

        if ($format === 'object') {
            // for php (returns stdClass)
            return $result;
        } elseif ($format === 'json') {
            // for javascript
            return json_encode($arrayResult);
        } elseif ($format === 'array') {
            return $arrayResult;
        }
    }
    return null;
};





<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/api/a1/auth/register',
        '/api/a1/auth/login',
        '/api/a1/register/register',
        '/api/a1/register/data',
        '/api/a1/register/login',
        '/api/a1/rent/register',
        '/api/a1/rent/login',
        '/api/a1/return/register',
        '/api/a1/return/login',
        '/api/a1/penalties/register',
        '/api/a1/penalties/login',
    ];
}

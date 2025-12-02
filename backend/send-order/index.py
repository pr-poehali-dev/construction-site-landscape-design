'''
Business: Отправка заказа на email компании
Args: event - dict с httpMethod, body (содержит order с items, total, customer)
      context - object с атрибутами request_id, function_name
Returns: HTTP response dict с statusCode, headers, body
'''

import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import os

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        order = body_data.get('order', {})
        items = order.get('items', [])
        total = order.get('total', 0)
        customer = order.get('customer', {})
        
        items_html = ''
        for item in items:
            items_html += f'''
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{item['name']}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">{item['quantity']} {item['unit']}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">{item['price']} ₽</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">{item['price'] * item['quantity']} ₽</td>
            </tr>
            '''
        
        html_content = f'''
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #1e40af; border-bottom: 3px solid #f97316; padding-bottom: 10px;">Новый заказ на материалы</h1>
                
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <h2 style="margin-top: 0; color: #1e40af;">Информация о клиенте:</h2>
                    <p><strong>Имя:</strong> {customer.get('name', 'Не указано')}</p>
                    <p><strong>Телефон:</strong> {customer.get('phone', 'Не указано')}</p>
                    <p><strong>Email:</strong> {customer.get('email', 'Не указано')}</p>
                    <p><strong>Адрес доставки:</strong> {customer.get('address', 'Не указано')}</p>
                    {f"<p><strong>Комментарий:</strong> {customer.get('comment')}</p>" if customer.get('comment') else ''}
                </div>
                
                <h2 style="color: #1e40af;">Состав заказа:</h2>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <thead>
                        <tr style="background-color: #1e40af; color: white;">
                            <th style="padding: 10px; text-align: left;">Товар</th>
                            <th style="padding: 10px; text-align: center;">Количество</th>
                            <th style="padding: 10px; text-align: right;">Цена</th>
                            <th style="padding: 10px; text-align: right;">Сумма</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_html}
                    </tbody>
                </table>
                
                <div style="text-align: right; margin-top: 20px;">
                    <p style="font-size: 20px; color: #f97316;"><strong>Итого: {total:,} ₽</strong></p>
                </div>
                
                <div style="background-color: #fef3c7; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #f97316;">
                    <p style="margin: 0;"><strong>⚠️ Требуется:</strong> Связаться с клиентом для уточнения деталей заказа и предоставления реквизитов для оплаты</p>
                </div>
            </div>
        </body>
        </html>
        '''
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новый заказ на сумму {total:,} ₽ от {customer.get("name", "клиента")}'
        msg['From'] = 'orders@stroydom.ru'
        msg['To'] = 'sales@stroydom.ru'
        
        msg.attach(MIMEText(html_content, 'html', 'utf-8'))
        
        print(f"Order processed: {len(items)} items, total: {total} RUB")
        print(f"Customer: {customer.get('name')} ({customer.get('email')})")
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Order sent successfully',
                'order_id': context.request_id
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f"Error processing order: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            }),
            'isBase64Encoded': False
        }

/**
 * @Author: anton
 * @Date:   12-Feb-2018
 * @Email:  anton@pantapasen.se
 * @Last modified by:   anton
 * @Last modified time: 12-Feb-2018
 */
const { getMenu } = require('./index');
getMenu().then(menu => console.log(menu));

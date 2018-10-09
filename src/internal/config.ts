import config from 'nconf'

config
    .file('../gpi.poc.config.json');

config.get('env') && (process.env.NODE_ENV = config.get('env'));

process.env.appname = 'api';

export default config
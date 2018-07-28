namespace ServerManager {

    class Connection {
        private String host, port;
        private Requests request;
        public Connection(String host, String port) {
            this.host = host;
            this.port = port;

            request = new Requests(this);
        }

        
    }

    class Requests {
        protected Connection con;

        public Requests(Connection con) {
            this.con = con;
        }

        public function get(url) {

        }

    }
}
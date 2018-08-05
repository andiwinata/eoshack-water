#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

class waterquality : public eosio::contract {
  public:
      waterquality(account_name s):
        contract(s), // initialization of the base class for the contract
        _people(s, s) // initialize the table with code and scope NB! Look up definition of code and scope
      {
      }

      /*struct water_metrics {
        //std::string device_id; // SGX1278989
        double geo_lat; // 123.455
        double geo_lon; // 111.333
        uint64_t timestamp; // 1477849493
        double coliform_number; // 2.8
        double ph_level; // 9
        double chlorine_level; // 8.4
        double turbidity; // 12.3
      };*/

      /// @abi action
      void create(
          uint64_t deviceid,
          double geo_lat,
          double geo_lon,
          uint64_t timestamp,
          double coliform_number,
          double ph_level,
          double chlorine_level,
          double turbidity) {
        // Let's make sure the primary key doesn't exist
        // _people.end() is in a way similar to null and it means that the value isn't found
        eosio_assert(_people.find(deviceid) == _people.end(), "This SSN already exists in the addressbook");
        _people.emplace(get_self(), [&]( auto& p ) {
           p.deviceid = deviceid;
           p.geo_lat = geo_lat;
           p.geo_lon = geo_lon;
           p.timestamp = timestamp;
           p.coliform_number = coliform_number;
           p.ph_level = ph_level;
           p.chlorine_level = chlorine_level;
           p.turbidity = turbidity;
           p.water_ok = is_water_ok(coliform_number, ph_level, chlorine_level, turbidity);
        });
      }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table people
    struct reading {
      uint64_t deviceid; // primary key
      double geo_lat;
      double geo_lon;
      uint64_t timestamp;
      double coliform_number;
      double ph_level;
      double chlorine_level;
      double turbidity;
      bool water_ok;

      uint64_t primary_key()const { return deviceid; }
      uint64_t by_timestamp()const { return timestamp; } // secondary index
    };

    bool is_water_ok(
          double coliform_number,
          double ph_level,
          double chlorine_level,
          double turbidity) {
      return
          ph_level >= 6.5 && ph_level <= 8.5 &&
          turbidity < 5 &&
          chlorine_level < 5 &&
          coliform_number < 2;
    }

    // We setup the table:
    /// @abi table
    typedef eosio::multi_index< N(people), reading, indexed_by<N(bytimestamp), const_mem_fun<reading, uint64_t, &reading::by_timestamp>>> people;

    // test commands (failing and passing):
    // eosiocpp -o /opt/eosio/bin/contracts/waterquality/waterquality.wast /opt/eosio/bin/contracts/waterquality/waterquality.cpp
    // eosiocpp -g /opt/eosio/bin/contracts/waterquality/waterquality.abi /opt/eosio/bin/contracts/waterquality/waterquality.cpp
    // cleos set contract testacc /opt/eosio/bin/contracts/waterquality/ --permission testacc@active
    // cleos push action testacc create '[1, 1.0, 1.0, 1, 1.0, 1.0, 1.0, 1.0 ]' -p testacc@active
    // cleos get table testacc testacc people

    // TODO: should be renamed but CBF
    people _people;

};

 EOSIO_ABI( waterquality, (create) )

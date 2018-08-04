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

      struct water_metrics {
        std::string device_id; // SGX1278989
        double geo_lat; // 123.455
        double geo_lon; // 111.333
        uint64_t timestamp; // 1477849493
        double coliform_number; // 2.8
        uint64_t ph_level; // 9
        double chlorine_level; // 8.4
        double turbidity; // 12.3
      };

      /// @abi action
      void create(account_name username, uint64_t deviceid, const std::string& fullname, struct water_metrics metrics) {
        require_auth(username);
        // Let's make sure the primary key doesn't exist
        // _people.end() is in a way similar to null and it means that the value isn't found
        eosio_assert(_people.find(deviceid) == _people.end(), "This SSN already exists in the addressbook");
        _people.emplace(get_self(), [&]( auto& p ) {
           p.deviceid = deviceid;
           p.fullname = fullname;
           p.metrics = metrics;
           p.waterquality = water_ok(metrics) ? 1 : 0;
           // ^ TODO: Maybe replace with bool
        });
      }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table people
    struct reading {
      uint64_t deviceid; // primary key
      std::string fullname;
      struct water_metrics metrics;
      uint64_t waterquality;

      uint64_t primary_key()const { return deviceid; }
      // TODO: Do we need a secondary key or not?
      uint64_t by_waterquality()const { return waterquality; }
    };

    bool water_ok(struct water_metrics metrics) {
      return
          metrics.ph_level >= 6.5 && metrics.ph_level <= 8.5 &&
          metrics.turbidity < 5 &&
          metrics.chlorine_level < 5 &&
          metrics.coliform_number < 2;
    }

    // We setup the table:
    /// @abi table
    typedef eosio::multi_index< N(people), reading, indexed_by<N(bywaterquality), const_mem_fun<reading, uint64_t, &reading::by_waterquality>>> people;

    people _people;

};

 EOSIO_ABI( waterquality, (create) )

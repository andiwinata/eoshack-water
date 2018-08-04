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

      /// @abi action
      void create(account_name username, uint64_t deviceid, const std::string& fullname, uint64_t waterquality) {
        require_auth(username);
        // Let's make sure the primary key doesn't exist
        // _people.end() is in a way similar to null and it means that the value isn't found
        eosio_assert(_people.find(deviceid) == _people.end(), "This SSN already exists in the addressbook");
        _people.emplace(get_self(), [&]( auto& p ) {
           p.deviceid = deviceid;
           p.fullname = fullname;
           p.waterquality = waterquality;
        });
      }

  private:
    // Setup the struct that represents the row in the table
    /// @abi table people
    struct reading {
      uint64_t deviceid; // primary key
      std::string fullname;
      // TODO: replace with struct containing water metrics
      uint64_t waterquality;

      uint64_t primary_key()const { return deviceid; }
      uint64_t by_waterquality()const { return waterquality; }
    };

    // We setup the table:
    /// @abi table
    typedef eosio::multi_index< N(people), reading, indexed_by<N(bywaterquality), const_mem_fun<reading, uint64_t, &reading::by_waterquality>>> people;

    people _people;

};

 EOSIO_ABI( waterquality, (create) )

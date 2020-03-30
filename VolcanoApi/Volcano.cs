using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace VolcanoApi
{
    public class Volcano
    {
        [JsonProperty(PropertyName = "Volcano Name")]
        public string VolcanoName { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        //public Location Location { get; set; }
        public int? Elevation { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        [JsonProperty(PropertyName = "Last Known Eruption")]
        public string LastKnownEruption { get; set; }
        public Guid Id { get; set; }
    }
}

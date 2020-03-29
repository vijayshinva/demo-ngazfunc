using System;
using System.Collections.Generic;
using System.Text;

namespace VolcanoApi
{
    public class Volcano
    {
        public string VolcanoName { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public int Elevation { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string LastKnownEruption { get; set; }
        public Guid Id { get; set; }
    }
}
